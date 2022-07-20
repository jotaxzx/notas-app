import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from '../../hooks'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startEmailPassword } from '../../store/auth/thunks'

const formValidations = {
  email: [(value) => value.includes('@'), 'Escribe un correo válido'],
  password: [(value) => value.length >= 6, 'El password debe tener más de 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
}

const formData = {
    displayName: '',
    email: '',
    password: '',
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector(state => state.auth);

  const [formSubmitted, setFormSubmitted] = useState(false);


  const { displayName, email, password, onInputChange, formState, displayNameValid, emailValid, passwordValid, isFormValid } = useForm(formData, formValidations)



  const onSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return
    }
    setFormSubmitted(true)
    dispatch(startEmailPassword({ displayName, email, password }))
  }

  return (
    <>
      <AuthLayout title="Registro">

        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__bounce">
          <Grid container>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Nombre completo"
                type="text"
                placeholder='Nombre completo'
                fullWidth
                name='displayName'
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid && formSubmitted ? displayNameValid : null}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder='correo@google.com'
                fullWidth
                name='email'
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid && formSubmitted ? emailValid : null}

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
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid && formSubmitted ? passwordValid : null}
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '': 'none'}>
                <Alert severity='error' >{errorMessage}</Alert>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  color="primary"
                  fullWidth
                  disabled={status == 'checking'}
                >
                  <Typography sx={{ color: 'white' }}>Crear Cuenta</Typography>
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={RouterLink} color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>


      </AuthLayout>
    </>
  )
}
