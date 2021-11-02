const theme = {
  colors: {
    primary: '#007AFF',
    white: '#FAFAFA',
    lightGray: '#EBEBEB',
    gray: '#CACACA',
    black: '#000000'
  },
  spacing: {
    xs: 4,
    sm: 8,
    m: 16,
    l: 32,
    xl: 40,
  },
  textVariants: {
    h1: {
      fontFamily: 'Nunito-Bold',
      fontSize: 24,
    },
    h2: {
      fontFamily: 'Nunito-Bold',
      fontSize: 18,
    },
    body1: {
      fontFamily: 'Nunito-Regular',
      fontSize: 18,
    },
    body2: {
      fontFamily: 'Nunito-Regular',
      fontSize: 16,
    },
    body3: {
      fontFamily: 'Nunito-Regular',
      fontSize: 14,
    },
  },
  borderRadius: {
    xs: 1,
    m: 10,
  },
  imageHeight: {
    xs: 40,
    s: 100,
    m: 112,
    l: 123,
  },
  shadows:{
    boxShadownBottom: {
      shadowColor: "#000",
      shadowOffset:{
        width: 0,
        height: -4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1,
      elevation: 5,
    },
    boxShadownTop: {
      shadowColor: "#000",
      shadowOffset:{
        width: 0,
        height: -4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    }
  }
}

export default theme;