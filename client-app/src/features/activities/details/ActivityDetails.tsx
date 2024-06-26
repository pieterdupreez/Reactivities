import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Grid
} from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';


function ActivityDetails() {

    const { activityStore } = useStore();
    const { selectedActivity: activity, loadAcvtivity, loadingInitial } = activityStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadAcvtivity(id);
    }, [id, loadAcvtivity])

    if (loadingInitial || !activity) return <LoadingComponent />;
    

  return (
      <Grid>
          <Grid.Column width={10}>
              <ActivityDetailedHeader activity={ activity} />
              <ActivityDetailedInfo activity={activity} />
              <ActivityDetailedChat />
          </Grid.Column>
          <Grid.Column width={6}>
              <ActivityDetailedSidebar />
          </Grid.Column>
      </Grid>
  );
}

export default observer (ActivityDetails);