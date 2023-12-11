
import Placeholder from 'react-bootstrap/Placeholder';
import Card from 'react-bootstrap/Card';

const PageLoaderes = () => {
    return (
        <div>
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
            </Card.Body>
        </div>
    );
}

export default PageLoaderes;
