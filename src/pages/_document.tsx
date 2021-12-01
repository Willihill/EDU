import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <Html
        lang='pt-br'
      >
        <Head>
          {/* <link rel='shortcut icon' href='favicon.png' type='image/png' /> */}
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          {/*
            Thin 100
            Light 300
            Regular 400
            Medium 500
            Bold 700
            Black 900
          */}
          <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap' rel='stylesheet' />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>

      </Html>
    )
  }
}
