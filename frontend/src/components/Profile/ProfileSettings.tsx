import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  List,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid2';
import { listWrapper } from './style';
import { SubmitButton } from '../Common/SubmitButton';
import { arrayStringNormalizer } from '../../utils';
import { progressWrapper } from '../style';
import { useAtom } from 'jotai';
import { authAtom } from '../../stores';
import { enqueueSnackbar } from 'notistack';

type FormInputs = {
  categories: string[];
  sources: string[];
};

export const ProfileSettings: FunctionComponent = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [spinn, setSpinn] = useState(false);
  const [auth, setAuth] = useAtom(authAtom);

  const { handleSubmit } = useForm<FormInputs>();

  // Fetch filters
  useEffect(() => {
    setLoading(true);
    const fetchFilters = async () => {
      const response = await axios.get(
        'http://localhost:8000/api/articles/filters'
      );
      setCategories(response.data.categories);
      setSources(response.data.sources);

      const authorsData = Object.values(response.data.authors).map((author) => {
        if (typeof author === 'string') {
          return author.split(' (')[0];
        }
        return '';
      });
      setAuthors(authorsData);

      // Fetch user preferences
      const userResponse = await axios.get(
        'http://localhost:8000/api/user/preferences',
        {
          withCredentials: true,
        }
      );
      if (userResponse) {
        const preferredCategories = (() => {
          const raw = userResponse.data.preferred_categories;
          const newData = arrayStringNormalizer(raw);
          return newData;
        })();

        const preferredSources = (() => {
          const raw = userResponse.data.preferred_sources;
          const newData = arrayStringNormalizer(raw);
          return newData;
        })();

        const preferredAuthors = (() => {
          const raw = userResponse.data.preferred_authors;
          const newData = arrayStringNormalizer(raw);
          return newData;
        })();

        setSelectedCategories(preferredCategories);
        setSelectedSources(preferredSources);
        setSelectedAuthors(preferredAuthors);
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = async () => {
    setSpinn(true);
    try {
      await axios.post(
        'http://localhost:8000/api/settings/preferences',
        {
          preferred_categories: selectedCategories,
          preferred_sources: selectedSources,
          preferred_authors: selectedAuthors,
        },
        { withCredentials: true }
      );
      setSpinn(false);
      setAuth({
        ...auth,
        userCategories: JSON.stringify(selectedCategories),
        userSources: JSON.stringify(selectedSources),
        userAuthors: JSON.stringify(selectedAuthors),
      });
      enqueueSnackbar('Successfully saved.', { variant: 'success' });
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={progressWrapper}>
        <CircularProgress size="2rem" />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: '1rem' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5">Settings</Typography>
        <Grid container spacing={2} sx={{ mt: '1.5rem' }}>
          <Grid size={12}>
            <Typography>Categories:</Typography>
            <Box sx={listWrapper}>
              <List sx={{ columnCount: { xs: 1, sm: 2, md: 2, lg: 4, xl: 4 } }}>
                {categories.map((category) => (
                  <FormControlLabel
                    key={category}
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => {
                          setSelectedCategories((prevSelected) => {
                            const updated = e.target.checked
                              ? [...prevSelected, category]
                              : prevSelected.filter((c) => c !== category);
                            return updated;
                          });
                        }}
                      />
                    }
                    label={category}
                    sx={{ display: 'flex' }}
                  />
                ))}
              </List>
            </Box>
          </Grid>
          <Grid size={12}>
            <Typography>Sources:</Typography>
            <Box sx={listWrapper}>
              <List sx={{ columnCount: { xs: 1, sm: 2, md: 2, lg: 4, xl: 4 } }}>
                {sources.map((source) => (
                  <FormControlLabel
                    key={source}
                    control={
                      <Checkbox
                        checked={selectedSources.includes(source)}
                        onChange={(e) => {
                          setSelectedSources((prevSelected) => {
                            const updated = e.target.checked
                              ? [...prevSelected, source]
                              : prevSelected.filter((c) => c !== source);
                            return updated;
                          });
                        }}
                      />
                    }
                    label={source}
                    sx={{ display: 'flex' }}
                  />
                ))}
              </List>
            </Box>
          </Grid>
          <Grid size={12}>
            <Typography>Authors:</Typography>
            <Box sx={listWrapper}>
              <List sx={{ columnCount: { xs: 1, sm: 2, md: 2, lg: 4, xl: 4 } }}>
                {authors.map((author) => (
                  <FormControlLabel
                    key={author}
                    control={
                      <Checkbox
                        checked={selectedAuthors.includes(author)}
                        onChange={(e) => {
                          setSelectedAuthors((prevSelected) => {
                            const updated = e.target.checked
                              ? [...prevSelected, author]
                              : prevSelected.filter((c) => c !== author);
                            return updated;
                          });
                        }}
                      />
                    }
                    label={author}
                    sx={{ display: 'flex' }}
                  />
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
        <SubmitButton
          title="Save Preferences"
          spinn={spinn}
          fullWidth={false}
        />
      </Box>
    </Container>
  );
};
