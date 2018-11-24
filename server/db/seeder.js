// Config.
import '../config/config';
import './mongoose';

// Seeders.
import UsersCollectionSeeder from './seeds/users';

// Models.
import { User } from '../api/models/User';

(async () => {
    // Truncate tables
    await User.remove();

    // Run seeders
    await new UsersCollectionSeeder().run();
})().then(process.exit)
    .catch(e => {
        console.error(e);
        process.exit(1);
    });