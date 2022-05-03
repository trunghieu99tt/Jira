import Form from '@components/shared/Form';
import SelfControlledInput from '@components/shared/SelfControlledInput';

const Login = () => {
  return (
    <form>
      <SelfControlledInput name={'username'} placeholder={'username'} />
      <SelfControlledInput
        name={'password'}
        placeholder={'password'}
        type="password"
      />
    </form>
  );
};

export default Login;
