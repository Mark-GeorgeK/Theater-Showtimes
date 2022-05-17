import express from "express";
import homePageController from "../controllers/homePageController";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";
import moviePageController from '../controllers/moviePageController';
import searchController from '../controllers/searchController';
import HandleAccountPage from '../controllers/accountController';
import paymenthandle from '../controllers/paymentcontroller';
import seatshandle from "../controllers/seatscontroller";
import payhandle from "../controllers/paycontroller";

// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homePageController.handleHomePage);
    router.get("/login", loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.post("/logout", loginController.postLogOut);
    router.get('/:cinemaName/:movieName', loginController.checkLoggedIn, moviePageController.handleMovieDetails);
    router.get('/account', HandleAccountPage);
    router.get('/search', searchController.HandleSearchPage);
    router.post('/search', searchController.searchFor);
    router.post('/buy', payhandle);
    router.post('/payment', (req, res) => res.send("Successful payment"));
    router.post('/pay', paymenthandle);
    router.post('/seats', seatshandle);
    return app.use("/", router);
};

module.exports = initWebRoutes;
