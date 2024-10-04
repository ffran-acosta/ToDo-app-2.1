import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from "@/model/User";


// User Register
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {res.status(400).json({ msg: 'User alrady exists'})}

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ username, email, password: hashedPassword})
        await newUser.save()

        res.status(201).json({ msg: 'User registered successfully'})

    } catch (error) {
        console.error('Error during registration: ', error)
        res.status(500).json({ msg: 'Server error', error})
    }
}

// User Login
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { usernameOrEmail, password } = req.body

        const user = await User.findOne({
            $or: [{ username: usernameOrEmail}, { email: usernameOrEmail}]
        })

        if (!user) {
            res.status(400).json({ msg: 'Invalid credentials' })
            return
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ msg: 'Invalid credentials' })
            return
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', {expiresIn: '1h'})
        res.json({ token })

    } catch (error) {
        console.error('Error during login: ', error)
        res.status(500).json({ msg: 'Server error', error})
    }
}