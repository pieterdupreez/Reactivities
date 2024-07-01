import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';


function ActivityForm() {


    const { activityStore } = useStore();
    const { selectedActivity, createActivity, updateActivity, loading, loadAcvtivity, loadingInitial } = activityStore
    const { id } = useParams();

    const navigate = useNavigate();


    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        description: '',
        date: null,
        category: '',
        city: '',
        venue: ''
    }); 

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required.'),
        description: Yup.string().required('Description is required.'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required.').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    }

    )


    useEffect(() => {
        if (id) loadAcvtivity(id).then(activity => setActivity(activity!))
    }, [id, loadAcvtivity]);

    function handleFormSubmit(activity: Activity) {
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`))

        }
        else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
        
    }



    if (loadingInitial) return <LoadingComponent content='Loading activity...'/>;

    return (
        <Segment clearing>
        <Header content='Activity details' sub color='teal'></Header>
            <Formik enableReinitialize validationSchema={validationSchema} initialValues={activity} onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name = 'title' placeholder = 'Title'/>

                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput placeholder='Category' name='category' options={categoryOptions} />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat = 'MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location details' sub color='teal'></Header>
                        <MyTextInput placeholder='City'  name='city'  />
                        <MyTextInput placeholder='Venue'  name='venue'  />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )} 
            </Formik>
            
        </Segment>
  );
}

export default observer (ActivityForm);