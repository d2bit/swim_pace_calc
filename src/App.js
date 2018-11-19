import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function App() {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          margin="dense"
          label="Time"
          placeholder="e.g. 12:10.9"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          margin="dense"
          label="Distance (in meters)"
          placeholder="e.g 800"
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" size="large">
          Calculate
        </Button>
      </Grid>
    </Grid>
  )
}

export default App
