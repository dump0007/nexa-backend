import express from "express";
import config from "../config/env/index";

const whitelist = [config.origin, config.origin2];
const originMiddleware: express.RequestHandler = (req, res, next) => {
  const currentOrigin = req.get("Origin");
  console.log(currentOrigin);
  // console.log(whitelist, "whitelist");
  // const exist = whitelist.includes(origin);
  if (currentOrigin == config.origin || currentOrigin == config.origin2) {
    next();
  } else {
    return res
      .status(405)
      .json({ status: 405, error: true, message: "Method Not Allowed" });
  }
  // if (origin == undefined) {
  //   return res
  //     .status(405)
  //     .json({ status: 405, error: true, message: "Method Not Allowed" });
  // } else {
  //   if (exist) {
  //     next();
  //   } else {
  //     return res
  //       .status(405)
  //       .json({ status: 405, error: true, message: "Method Not Allowed" });
  //   }
  // }
};

export default originMiddleware;
