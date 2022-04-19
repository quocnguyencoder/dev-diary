interface Tag {
  [name: string]: {
    color: {
      light: string
      dark: string
      hover: string
    }
  }
}

const commonTagsList: Tag = {
  javascript: {
    color: {
      light: 'orange.300',
      dark: 'orange.600',
      hover: 'orange.400',
    },
  },
  react: {
    color: {
      light: 'blue.600',
      dark: 'blue.400',
      hover: 'blue.200',
    },
  },
  'next.js': {
    color: {
      light: 'yellow.600',
      dark: 'yellow.700',
      hover: 'yellow.400',
    },
  },
  _default: {
    color: {
      light: 'gray.800',
      dark: 'gray.600',
      hover: 'gray.400',
    },
  },
}

export default commonTagsList
