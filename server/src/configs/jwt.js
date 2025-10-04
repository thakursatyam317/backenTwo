import jwt from 'jsonwebtoken';

const genAuthToken = (user_id, res)=>{
    const token = jwt.sign(
        {_id : user_id},
         process.env.JWT_SECRIT_KEY,
         {expiresIn : '15d'}
        )

        res.cookie('token', token,{
            httpOnly: true,
            maxAge : 15*24*60*60*1000,
            sameSite:true,
            secure:true

        });

}

export default genAuthToken;