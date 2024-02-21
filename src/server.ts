import app from './app';
import * as passportConfig from "./config/passport";

const port = process.env.PORT || 3000

// Configure passport
passportConfig.configure(app);

app.listen(
    port,
    () => console.log(`🚀 Server ready at: http://localhost:${port}`),
);