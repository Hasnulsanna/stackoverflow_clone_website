// import jwt from 'jsonwebtoken'
// //next is an call back fn which containall fn in cotrollers
// const auth = (req,res,next) => {
//     try {
//         const token=req.headers.authorization.split(' ')[1]
// //verify if token is crrct
//         let decodeData=jwt.verify(token,'test')
//         req.userId=decodeData?.id 
//         next()
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default auth;

import jwt from "jsonwebtoken";
// const JWT_SECRET="test"

const auth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];

//     let decodeData = jwt.verify(token,process.env.JWT_SECRET);
//     req.userId = decodeData?.id;

//     next();
//   } catch (error) {
//     console.log(error);
//   }
};


export default auth;
