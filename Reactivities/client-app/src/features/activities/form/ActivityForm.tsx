import { Button, FormField, Label, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Th activity title is required"),
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  // function handleSubmit() {
  //   if (!activity.id) {
  //     activity.id = uuid();
  //     createActivity(activity).then(() =>
  //       navigate(`/activities/${activity.id}`)
  //     );
  //   } else {
  //     updateActivity(activity).then(() =>
  //       navigate(`/activities/${activity.id}`)
  //     );
  //   }
  // }

  // function handleInputChange(
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) {
  //   const { name, value } = event.target;
  //   setActivity({ ...activity, [name]: value });
  // }

  if (loadingInitial) return <LoadingComponent content='Loading activity...' />;

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <FormField>
              <Field placeholder='Title' name='title' />
              <ErrorMessage
                name='title'
                render={(error) => <Label basic color='red' content={error} />}
              />
            </FormField>
            <Field placeholder='Description' name='description' />
            <Field placeholder='Category' name='category' />
            <Field type='date' placeholder='Date' name='date' />
            <Field placeholder='City' name='city' />
            <Field placeholder='Venue' name='venue' />
            <Button
              loading={loading}
              positive
              floated='right'
              content='Submit'
              type='submit'
            />
            <Button
              as={Link}
              to='/activities'
              floated='right'
              content='Cancel'
              type='button'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
