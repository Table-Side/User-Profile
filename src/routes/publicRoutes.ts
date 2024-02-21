import { Router } from 'express';

const publicRoutes = Router();

// Register route
publicRoutes.post('/register', async (req, res) => {
    let { email, password, role } = req.body;

    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Provide default role
    if (!role) {
        role = 'Normal';
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                role: role,
            },
        });
        res.status(201).json({ message: 'User created successfully!', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login route
publicRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare hashed passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = passportJWT.sign({ id: user.id }, jwtOptions.secretOrKey);

    // Send user data and token
    res.json({ ...user, password: undefined, token });
});

export default publicRoutes;