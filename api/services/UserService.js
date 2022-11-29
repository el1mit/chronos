const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const TokenService = require('./TokenService');
const MailService = require('./MailService');
const calendarService = require('./CalendarService');
const UserDto = require('../dtos/UserDto');
const ErrorHandler = require('../exeptions/ErrorHandler');

class UserService {

    constructor() {
        this.tokenService = new TokenService();
        this.mailService = new MailService();
    }


    async createUser(firstname, lastname, login, password, email) {
        if (await UserModel.findOne({ login })) {
            throw ErrorHandler.BadRequest(`User with the login ${login} already exists`);
        }

        if (await UserModel.findOne({ email })) {
            throw ErrorHandler.BadRequest(`The email ${email} already in use`);
        }

        password = await bcrypt.hash(password, 8);
        const user = await UserModel.create(
            {
                firstname: firstname,
                lastname: lastname,
                login: login,
                password: password,
                email: email
            });

        console.log("Created user with id: " + user._id);
        const calendar = await calendarService.createCalendar("main", '', 'task', user._id);
        user.own_calendars.push(calendar.calendar.id);

        const userDto = new UserDto(user);
        const token = this.tokenService.generateRefreshToken({ ...userDto });

        this.mailService.sendGreetings(email);

        return { ...token, user: userDto }
    }


    async getUserById(id) {
        console.log("Get user with id: " + id);
        const user = await UserModel.findById(id);

        if (!user) {
            throw ErrorHandler.BadRequest(`User not found`);
        }

        const userDto = new UserDto(user);
        return { user: { ...userDto } }
    }


    async login(login, password) {
        const user = await UserModel.findOne({ login });

        if (!user) {
            throw ErrorHandler.BadRequest(`User with the login ${login} not found`);
        }

        console.log("Login user with id: " + user._id);

        if (!await bcrypt.compare(password, user.password)) {
            throw ErrorHandler.BadRequest(`Wrong password`);
        }

        const userDto = new UserDto(user);
        const token = this.tokenService.generateRefreshToken({ ...userDto });

        return { ...token, user: userDto }
    }


    async sendResetLinkToEmail(email) {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw ErrorHandler.BadRequest(`User with the email ${email} not found`);
        }

        const token = this.tokenService.generateRefreshToken({ id: user._id });

        let link = process.env.CLIENT_URL + '/reset/' + token.refreshToken;
        this.mailService.sendResetLink(email, link);
    }


    async resetPassword(token, password) {
        const user_id = this.tokenService.validateRefreshToken(token).id;

        if (!user_id) {
            throw ErrorHandler.BadRequest(`Token not found`);
        }

        const user = await UserModel.findById(user_id);
        if (!user) {
            throw ErrorHandler.BadRequest(`User not found`);
        }

        user.password = await bcrypt.hash(password, 8);
        user.save();

        const userDto = new UserDto(user);
        const refreshToken = this.tokenService.generateRefreshToken({ ...userDto });

        return { ...refreshToken, user: userDto }
    }

}


module.exports = new UserService();