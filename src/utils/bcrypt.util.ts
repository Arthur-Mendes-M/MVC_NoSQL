import bcrypt from 'bcrypt'

function hashPassword(password: string, saltRounds?: 10) {
    const salt = bcrypt.genSaltSync(saltRounds)

    const hash = bcrypt.hashSync(password, salt)

    return hash
}

function verifyHashedPassword(cleanPassword: string, hashedPassword: string) {
    return bcrypt.compare(cleanPassword, hashedPassword)
}

export { hashPassword, verifyHashedPassword}