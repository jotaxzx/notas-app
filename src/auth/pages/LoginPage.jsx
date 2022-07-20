import { Link as RouterLink } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthentication, startGoogle, startLogin } from '../../store/auth/thunks'

const formData = {
    email: '',
    password: ''
};

export const LoginPage = () => {

  //tomo el status del estado del slice auth para bloquear botones 
  const { status, errorMessage } = useSelector(state => state.auth);

  // const mostrarInfo = (...arreglo) => {
  //   console.log(arreglo)
  // }
  // const arreglo = ['uno', 'dos', 'tres'];

  // mostrarInfo(...arreglo);


  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(formData)





  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(startLogin({ email, password }));
    // console.log({ email, password })
  }

  const onGoogle = (e) => {
    e.preventDefault();
    dispatch(startGoogle());
  }


  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__bounce">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={status == 'checking'}
                type='submit'
                variant='contained'
                color="primary"
                fullWidth
              >
                <Typography sx={{ color: 'white' }}>Login</Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={status == 'checking'}
                variant='contained'
                color="primary"
                fullWidth
                onClick={onGoogle}
              >
                <Google color='error' />
                <Typography sx={{ ml: 1, color: 'white' }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>


          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
