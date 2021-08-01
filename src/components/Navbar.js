import { Alignment, Navbar } from '@blueprintjs/core';

const Header = () => {
	return (
		<Navbar className="bp3-dark">
			<Navbar.Group align={Alignment.LEFT}>
				<Navbar.Heading>Web3 Metamask Demo</Navbar.Heading>
				<Navbar.Divider />
			</Navbar.Group>
		</Navbar>
	);
};

export default Header;
