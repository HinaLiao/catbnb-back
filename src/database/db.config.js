import { connect } from 'mongoose';

const initMongoDb = () => {
  connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to the database'))
    .catch((error) => console.log(error));
};

export default initMongoDb;
