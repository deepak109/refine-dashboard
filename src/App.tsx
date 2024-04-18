import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { Edit, useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider,liveProvider } from "./providers";
import { Home , ForgotPassword , Login , Register, CompanyList   } from "./pages"
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import Create from "./pages/company/create";
import EditPage from "./pages/company/edit";
import List from "./pages/tasks/list";
import CreateTask from "./pages/tasks/create";
import EditTask from "./pages/tasks/edit";



function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "q94ZLf-37WtM1-DaZTwE",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route index path="/register" element={<Register />}/>
                  <Route index path="/login" element={<Login />}/>
                  <Route index path="/forgot-password" element={<ForgotPassword />}/>
                  <Route element={
                  <Authenticated
                  key="authenticated-layout"
                  fallback={<CatchAllNavigate to="/login"/>}
                  >
                    <Layout>
                      <Outlet/>
                    </Layout>


                  </Authenticated>
                  }>
                    <Route index element={<Home />}/>
                    <Route path="/companies">
                      <Route index element={<CompanyList/>}/>
                      <Route path="new" element={<Create/>}/>
                      <Route path="edit/:id" element={<EditPage/>}/>
                    </Route>
                    <Route path="/tasks" element={
                    <List>
                      <Outlet/>
                    </List>}>
                      <Route path="new" element={<CreateTask/>}/>
                      <Route path="edit/:id" element={<EditTask/>}/>
                    </Route>
                </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
