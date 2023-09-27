import { role } from "./../constants/auth"

export const makeRoles = (roles) => {
  let listRole = []
  roles.forEach((r) => {
    const item = role.find((i) => i.id === r)
    if (item) {
      listRole.push(item.value)
    }
  })
  return listRole
}
