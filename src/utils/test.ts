export interface DataProps {
  id: number
  name: string
  secondName: string
  age: number
}

const data: DataProps = {
  id: 0,
  name: '',
  secondName: '',
  age: 10
}

const xpto = (id: number, name: string) => console.log(id, name)

const { id, name, age, ...dataMore } = data

xpto(id, name)
xpto(id, name)
xpto(id, name)
xpto(id, name)
xpto(id, name)
console.log(dataMore)
