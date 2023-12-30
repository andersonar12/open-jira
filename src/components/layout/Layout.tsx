import { Box } from "@mui/material";
import Head from "next/head";
import Navbar from "../ui/Navbar";
import { Sidebar } from '../ui/Sidebar';


export default function Layout( { title = "Open Jira" , children}: { title: string , children: React.ReactNode} ) {
  return (
    <Box sx={{ flexFlow: 1 }}>
        <Head>
          <title>{title}</title>
        </Head>

        <Navbar/>
        <Sidebar/>

        <Box sx={{ padding :'10px  20px' }}>
            { children }
        </Box>
    </Box>
  )
}
