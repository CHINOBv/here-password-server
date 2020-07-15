import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;
import User from "../models/users.model";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: `${process.env.JWT_SECRET}`,
};

passport.use(
  new LocalStrategy(
    {
      userField: "email",
    },
    async (email: string, password: string, done: any) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false);
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});
