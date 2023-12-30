"use client";

import Layout from "@/components/layout/Layout";
import { EntryList } from "@/components/ui/EntryList";
import { NewEntry } from "@/components/ui/NewEntry";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";

export default function Home() {
  return (
    <Layout title="Home - Open Jira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendientes" />

            <CardContent sx={{ paddingTop: 0}}>
              <NewEntry/>
              <EntryList status="pending"></EntryList>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="En progreso" />
            <CardContent sx={{ paddingTop: 0}}>
              <EntryList status="in-progress" ></EntryList>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Completadas" />
            
            <CardContent sx={{ paddingTop: 0}}>
              <EntryList status="finished"></EntryList>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
