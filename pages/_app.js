import {
  AppBar, BottomNavigation, BottomNavigationAction, Drawer, ListItem, ListItemIcon, ListItemText, useMediaQuery
} from '@mui/material'
import AppsIcon from '@mui/icons-material/Apps'
import HistoryIcon from '@mui/icons-material/History';
import { useRouter } from 'next/router'
import { SessionProvider } from "next-auth/react"
import { useState } from 'react'
import HistoryPage from '../components/HistoryPage'
import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [page, setPage] = useState(0)
  const largeDevice = useMediaQuery('(min-width: 960px)')
  const router = useRouter()
  const containerOffset = () => largeDevice ? '175px' : '0px'

  return (
    <SessionProvider session={session}>
      {largeDevice && (
        <Drawer variant="persistent" anchor="left" open={true}>
          <ListItem button key="Apps" onClick={() => setPage(0)} selected={page === 0}>
            <ListItemIcon><AppsIcon /></ListItemIcon>
            <ListItemText primary="Apps"/>
          </ListItem>
          <ListItem button key="History" onClick={() => setPage(1)} selected={page === 1}>
            <ListItemIcon><HistoryIcon /></ListItemIcon>
            <ListItemText primary="History"/>
          </ListItem>
        </Drawer>
      )}
      <div style={{ marginLeft: containerOffset() }}>
        {page === 0 && <Component {...pageProps} />}
        {page === 1 && <HistoryPage />}
      </div>
      {!largeDevice && (
        <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
          <BottomNavigation showLabels value={page}>
            <BottomNavigationAction icon={<AppsIcon />} label="Apps" onClick={() => setPage(0)} />
            <BottomNavigationAction icon={<HistoryIcon />} label="History" onClick={() =>setPage(1)} />
          </BottomNavigation>
        </AppBar>
      )}
    </SessionProvider>
  )
}
