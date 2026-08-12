import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/menu/texas-melts")({
  component: () => <Outlet />,
});
