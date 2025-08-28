import  { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { UserContext } from '../../Context/UserContext'

export default function NavBar() {
const { userData } = useContext(UserContext)!;
  
  
  return (
    <>
     <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">UMS</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{userData?.firstName} {userData?.lastName}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
    </>
  )
}
