import React from 'react'

import Image from 'next/image'

import { FlexPage } from 'components/Elements'
import { Button, CheckboxToggle, Form, InputText } from 'components/Forms'

import useLogin from 'hooks/useLogin'

import logoHorizontal from 'public/assets/images/logo-horizontal.svg'

import styles from 'styles/pages/Login/index.module.scss'

const LoginScreen = () => {
  const {
    user,
    password,
    remenber,
    onChangeUser,
    onChangePassword,
    onChangeRemenber,
    onSubmitLogin
  } = useLogin()

  return (
    <FlexPage>
      <div className={styles.container}>
        <section>
          <div className={styles.formVector} />
          <Form
            className={styles.form}
            onSubmit={onSubmitLogin}
          >
            <div className={styles.header}>
              <h1 className={styles.title}>Login</h1>
              <span className={styles.message}>Navegue no seu ambiente universitário unificado.</span>
            </div>

            <div className={styles.inputs}>
              <InputText
                label='Usuário'
                value={user}
                onChangeText={onChangeUser}
              />
              <InputText
                label='Senha'
                type='password'
                value={password}
                onChangeText={onChangePassword}
              />
            </div>

            <div className={styles.complement}>
              <CheckboxToggle
                label='Lembrar-me'
                active={remenber}
                onPressToggle={onChangeRemenber}
              />
              <span className={styles.forgoutPassowrd}>Esqueceu a senha ?</span>
            </div>

            <Button
              label='Logar'
            />
          </Form>
        </section>
        <section className={styles.artVector}>
          <div className={styles.logo}>
            <Image
              src={logoHorizontal}
              width={400}
              height={200}
            />
          </div>
          <div className={styles.vectors}>
            <img
              src='/assets/images/login-vector-abstract-1.svg'
              className={styles.vector}
            />
            <img
              src='/assets/images/login-vector-abstract-2.svg'
              className={styles.vector2}
            />
            <img
              src='/assets/images/login-vector.svg'
              className={styles.vector3}
            />
          </div>
        </section>
      </div>
    </FlexPage>
  )
}

export default LoginScreen
