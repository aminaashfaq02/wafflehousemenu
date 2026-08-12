import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/menu/beverages")({
  component: () => <Outlet />,
});
