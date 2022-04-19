import * as style from '@dicebear/adventurer'
import { createAvatar } from '@dicebear/avatars'

const generateAvatar = (id: string) => {
  const svg = createAvatar(style, {
    seed: id,
    dataUri: true,
    background: '#e7e7e7',
  })
  return svg
}

export default generateAvatar
