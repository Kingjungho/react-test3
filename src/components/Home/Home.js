import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import AuthContext from '../../store/auth-context'
import { useContext } from 'react';
import Button from '../UI/Button/Button'

const Home = () => {
  const ctx = useContext(AuthContext)
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={ctx.onLogout}>Log out</Button>
    </Card>
  );
};

export default Home;
