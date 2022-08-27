import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import PropTypes from 'prop-types';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../../db/db';
import TodoTask from '../TodoTask/TodoTask';
import DeleteTasksCategories from '../DeleteTasksCategories/DeleteTasksCategories';
import styles from './TabsTodos.module.scss';

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3, paddingTop: 0 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  index: PropTypes.number,
  // index: PropTypes.number.isRequired,
  // eslint-disable-next-line
  children: PropTypes.any.isRequired,
  // eslint-disable-next-line
  value: PropTypes.any.isRequired,
};
TabPanel.defaultProps = {
  index: 1000,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const { todos, categories } = db;
  const allTodos = useLiveQuery(() => todos.toArray(), []);
  const allCategories = useLiveQuery(() => categories.toArray(), []);
  const [value, setValue] = useState(0);
  const updateCounter = () => {
    allCategories?.forEach(async (elem, index) => {
      if (elem.id) {
        await categories.update(elem.id, { counter: index + 1 });
      }
    });
  };
  updateCounter();
  useEffect(() => {
    if (allCategories && allCategories.length < value) {
      setValue(0);
    }
  }, [allCategories]);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  // if (allCategories) {
  //   console.log(allCategories.length);
  // }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        // display: 'flex',
        display: 'grid',
        // grid-template-columns: 200px 200px 200px;
        gridTemplateColumns: '15% 85%',
        marginTop: 3,
        width: 1,
      }}
    >
      <div>
        <Tabs
          orientation="vertical"
          // variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            // minWidth: 0.2,
            // maxWidth: 0.4,
            // width: 0.15,
          }}
        >
          <Tab label="All" index={a11yProps(0)} />
          {allCategories &&
            allCategories.length > 0 &&
            allCategories?.map((elem) => (
              <Tab
                key={elem.categorieName}
                label={elem.categorieName}
                index={a11yProps(elem.counter)}
              />
            ))}
        </Tabs>
        <DeleteTasksCategories />
      </div>
      {allTodos && allTodos.length === 0 ? (
        <p className={styles.noTasks}>Any Tasks Yet</p>
      ) : (
        <>
          <TabPanel value={value} index={0}>
            <List sx={{ padding: 0 }}>
              {allTodos &&
                allTodos?.map((valueTodo) => {
                  const labelId = `checkbox-list-label-${valueTodo.id}`;
                  return (
                    <TodoTask
                      key={valueTodo.id}
                      value={valueTodo}
                      labelId={labelId}
                    />
                  );
                })}
            </List>
          </TabPanel>
          {allCategories &&
            allTodos &&
            allCategories?.map((elem) => (
              <TabPanel key={elem.id} value={value} index={elem.counter}>
                {allTodos?.map((item) => {
                  // console.log(elem.id);
                  // console.log(item.categorie);
                  // console.log(elem.categorieName);
                  if (item.categorie === elem.categorieName) {
                    const labelId = `checkbox-list-label-${item.id}`;
                    return (
                      <TodoTask key={item.id} value={item} labelId={labelId} />
                    );
                  }
                  return null;
                })}
              </TabPanel>
            ))}
        </>
      )}
    </Box>
  );
}
