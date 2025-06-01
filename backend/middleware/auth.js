import jwt from 'jsonwebtoken'
/*
const authUser = async(req,res,next) => {
    const {token} = req.headers;

    if(!token){
        return res.json({success:false,message:"Login to add items to cart"})
    }

    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)*/
       /* req.body.userId = token_decode.userId*/
         /*req.userId = token_decode.userId;
        next() 
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}*/


const authUser = async(req,res,next) => {
    console.log('AUTH middleware for /place');/*log to check if this middleware is being used*/
    const {token} = req.headers;
    console.log('Received token:', token);

    if(!token){
        return res.json({success:false,message:"Login to add items to cart"})
    }

    try{
        
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', token_decode);
        req.userId = token_decode.userId || token_decode.id;
        /*condtion to test next() is calls*/
        const valid = token_decode && (token_decode.userId || token_decode.id);
        if (!valid) {
            return res.status(401).json({ message: 'Unauthorized' });
        }   
        console.log('authUser: calling next()');
        next();
        console.log('authUser: after next()'); // This should not run
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
export default authUser

// Example:
// const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

