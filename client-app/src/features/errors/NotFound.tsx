import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

function NotFound() {
  return (
      <Segment placeholder>
          <Header icon>
              <Icon name='search' />
               Oops - we've looked but cannot find what you're looking for!
          </Header>
          <Segment.Inline>
              <Button as={Link} to='/activities'>
                Return to activities page
              </Button>
          </Segment.Inline>
      </Segment>
  );
}

export default NotFound;