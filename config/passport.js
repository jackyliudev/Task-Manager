const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');


module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/login/google/callback'
    }, async (accessToken, refreshToken, profile, done)=>{
        //console.log(profile)
        const newUser = {
            accountID: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }
        try{
            let user = await User.findOne({accountID: profile.id})
            if(user){
                console.log('User Found')
                done(null, user)
            }
            else{
                user = await User.create(newUser)
                done(null, user)
            }
        }
        catch (err){
            console.error(err)
        }
    }))

    passport.serializeUser(function(user,done){
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done){
       User.findById(id, (err,user) => {
           done(err, user)
       })
    })
}