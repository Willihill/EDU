import React, { useState } from 'react'

import Image from 'next/image'

import { FlexPage } from 'components/Elements'
import { Button, Form, InputText } from 'components/Forms'

import useSignup from 'hooks/useSinup'

import logoHorizontal from 'public/assets/images/logo-horizontal.svg'

import styles from 'styles/pages/Signup/index.module.scss'

import { cpfMask } from 'utils/helpers/String'

const SignupScreen = () => {
  const {
    login,
    cpf,
    email,
    name,
    password,
    onChangeUser,
    onChangePassword,
    onSubmitCadastro,
    onChangeCpf,
    onChangeEmail,
    onChangeName
  } = useSignup()

  const [confirmarEmail, setConfirmaEmail] = useState('')

  const onConfirmEmail = () => { if (confirmarEmail === email) return true }

  return (
    <FlexPage>
      <div className={styles.container}>
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
              src='/assets/images/cadastroUser/vector.svg'
              className={styles.vector}
            />
            <img
              src='/assets/images/cadastroUser/vector-2.svg'
              className={styles.vector2}
            />
            <img
              src='/assets/images/cadastrouser/ilustracao-vector.svg'
              className={styles.vector3}
            />
          </div>
        </section>
        <section>
          <div className={styles.formVector} />
          <Form
            className={styles.form}
            onSubmit={onSubmitCadastro}
          >
            <div className={styles.header}>
              <h1 className={styles.title}>Cadastramento</h1>
              <span className={styles.message}>Preencha o formulário abaixo para realizar o seu cadastro</span>
            </div>

            <div className={styles.inputs}>

              <div className={styles.left}>
                <div className={styles.input1}>
                  <InputText
                    label='Nome'
                    value={name}
                    onChangeText={onChangeName}
                  />
                  <img
                    src='/assets/images/cadastroUser/name.svg'
                    className={styles.icon}
                  />
                </div>

                <div className={styles.input1}>
                  <InputText
                    label='E-mail'
                    value={email}
                    onChangeText={onChangeEmail}
                  />
                  <img
                    src='/assets/images/cadastroUser/Mail.svg'
                    className={styles.icon}
                  />
                </div>

                <div className={styles.input1}>
                  <InputText
                    label='Usuário'
                    value={login}
                    onChangeText={onChangeUser}
                  /> <img
                    src='/assets/images/cadastroUser/user.svg'
                    className={styles.icon}
                     />
                </div>
              </div>

              <div className={styles.right}>
                <div className={styles.input2}>
                  <InputText
                    label='CPF'
                    value={cpfMask(cpf)}
                    onChangeText={onChangeCpf}
                  /> <img
                    src='/assets/images/cadastroUser/cpf.svg'
                    className={styles.icon}
                     />
                </div>
                <div className={styles.input2}>
                  <InputText
                    label='Confirmar E-mail'
                    value={confirmarEmail}
                    onChangeText={setConfirmaEmail}
                  /><img
                    src='/assets/images/cadastroUser/Mail.svg'
                    className={styles.icon}
                    />
                </div>
                <div className={styles.input2}>
                  <InputText
                    label='Senha'
                    value={password}
                    type='password'
                    onChangeText={onChangePassword}
                  /><img
                    src='/assets/images/cadastroUser/password.svg'
                    className={styles.icon}
                    />
                </div>
              </div>

            </div>

            <div className={styles.btn}>
              <Button
                label='Voltar'
              />
              {onConfirmEmail()
                ? <Button
                    label='Cadastrar'
                  />
                : <Button
                    label='Cadastrar'
                    disabled
                  />}
            </div>
          </Form>
        </section>
      </div>
    </FlexPage>
  )
}

export default SignupScreen
