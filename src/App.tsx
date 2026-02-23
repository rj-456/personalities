import { useState } from 'react';
import { personalitiesList } from './data';
import { 
  Container, Box, Typography, Paper, Card, CardHeader, 
  CardMedia, CardContent, CardActions, Button, Collapse, Divider,
  ThemeProvider, createTheme, CssBaseline
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';

// --- CUSTOM THEME AESTHETIC ---
const theme = createTheme({
  palette: {
    primary: {
      main: '#8B1A1A', // Deep Burgundy/Red
    },
    secondary: {
      main: '#D4AF37', // Gold
    },
    background: {
      default: '#F5F2EB', // Parchment / Old Paper color
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C1E16', // Very dark brown
      secondary: '#5C4332',
    }
  },
  typography: {
    fontFamily: '"Lora", "Georgia", "Times New Roman", serif', 
    h3: {
      fontWeight: 700,
      letterSpacing: '0.02em',
      color: '#4A0E0E', 
    },
    h5: {
      fontWeight: 600,
      color: '#2C1E16',
    },
    h6: {
      fontWeight: 600,
      color: '#8B1A1A',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontSize: '1rem',
    }
  },
});

// Custom styled Expand button
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  color: theme.palette.primary.main,
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function App() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % personalitiesList.length);
    setExpanded(false); 
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + personalitiesList.length) % personalitiesList.length);
    setExpanded(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const currentPerson = personalitiesList[index];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Container maxWidth="md" sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Header & Student Identification */}
        <Box sx={{ width: '100%', mb: 5, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            The Twelve Apostles
          </Typography>
          
          <Paper 
            elevation={4} 
            sx={{ 
              p: 2.5, 
              display: 'inline-block', 
              backgroundColor: '#FFFBF2', 
              border: '1px solid #D4AF37', 
              borderRadius: 2,
              mb: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#4A0E0E' }}>
              Rancis Santos
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">C-PEITEL3 | IT-3A</Typography>
          </Paper>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '95%', margin: '0 auto', fontStyle: 'italic', lineHeight: 1.8 }}>
            The following individuals are the original twelve primary disciples of Jesus Christ according to the New Testament. They were chosen to be his closest followers and later the primary teachers of his gospel message.
          </Typography>
        </Box>

        {/* Dynamic Display Card */}
        <Card sx={{ 
          maxWidth: 650, 
          width: '100%', 
          boxShadow: '0 12px 35px rgba(0,0,0,0.15)', 
          borderRadius: 3,
          overflow: 'hidden' 
        }}>
          <CardHeader
            title={currentPerson.name}
            subheader={`Apostle ${index + 1} of ${personalitiesList.length}`}
            titleTypographyProps={{ variant: 'h5' }}
            subheaderTypographyProps={{ sx: { fontStyle: 'italic', color: '#8B1A1A' } }}
            sx={{ textAlign: 'center', backgroundColor: '#FAFAFA', borderBottom: '1px solid #EAEAEA', py: 3 }}
          />
          
          {/* Museum Spotlight Effect Background */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            p: 4, 
            backgroundColor: '#1A110B', 
            backgroundImage: 'radial-gradient(circle, #3D2B1F 0%, #1A110B 100%)' 
          }}>
            <CardMedia
              component="img"
              image={currentPerson.url}
              alt={currentPerson.name}
              sx={{ 
                objectFit: 'contain', 
                height: 450, 
                width: 'auto', 
                borderRadius: '4px',
                border: '3px solid #D4AF37', 
                boxShadow: '0 8px 25px rgba(0,0,0,0.6)' 
              }}
            />
          </Box>
          
          <CardActions disableSpacing sx={{ justifyContent: 'space-between', px: 3, py: 2, backgroundColor: '#FAFAFA' }}>
            <Box>
              {/* REPLACED TEXT WITH ARROWS HERE */}
              <Button 
                variant="outlined" 
                onClick={handlePrev} 
                sx={{ mr: 2, borderRadius: '50%', minWidth: '45px', width: '45px', height: '45px', borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                aria-label="Previous"
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </Button>
              <Button 
                variant="contained" 
                onClick={handleNext}
                sx={{ borderRadius: '50%', minWidth: '45px', width: '45px', height: '45px', boxShadow: '0 4px 10px rgba(139, 26, 26, 0.3)' }}
                aria-label="Next"
              >
                <ArrowForwardIosIcon fontSize="small" />
              </Button>
            </Box>
            
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon fontSize="large" />
            </ExpandMore>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent sx={{ backgroundColor: '#FFFBF2', px: 4, py: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 1.5 }}><strong style={{color: '#8B1A1A'}}>Birthplace:</strong> {currentPerson.birthplace}</Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}><strong style={{color: '#8B1A1A'}}>Death:</strong> {currentPerson.death}</Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}><strong style={{color: '#8B1A1A'}}>Iconographic Symbol:</strong> {currentPerson.symbol}</Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}><strong style={{color: '#8B1A1A'}}>Feast Day:</strong> {currentPerson.feastDay}</Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}><strong style={{color: '#8B1A1A'}}>Patronage:</strong> {currentPerson.patronage}</Typography>
              </Box>
              
              <Divider sx={{ my: 3, borderColor: '#D4AF37', opacity: 0.4 }} />

              <Typography variant="h6" gutterBottom>
                Historical Tradition
              </Typography>
              <Typography paragraph variant="body1" sx={{ lineHeight: 1.8, color: '#2C1E16' }}>
                {currentPerson.description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
        
      </Container>
    </ThemeProvider>
  );
}