import SearchInputCmdk from "@/components/common/searchInputCmdk";
import ActiveComponent from "@/components/dashboard/home/active/active.component";
import CustomerComponent from "@/components/dashboard/home/customers/customer.component";
import CustomerChartComponent from "@/components/dashboard/home/customers/customerChart.component";
import GrowthRateComponent from "@/components/dashboard/home/growth-rate/growth-rate.component";
import TotalRevenueComponent from "@/components/dashboard/home/revenue/totalRevenue.component";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChartBarMultiple } from "@/components/ui/chart-bar-multiple";
import { ChartPieLabel } from "@/components/ui/chart-pie";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 justify-between">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Trang chủ</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mr-6">
          <SearchInputCmdk />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <div className="aspect-video rounded-xl p-4 border border-muted-foreground/10 bg-muted">
            <TotalRevenueComponent />
          </div>
          <div className="aspect-video rounded-xl p-4 border border-muted-foreground/10 bg-muted">
            <CustomerComponent />
          </div>
          <div className="aspect-video rounded-xl p-4 border border-muted-foreground/10 bg-muted">
            <ActiveComponent />
          </div>
          <div className="aspect-video rounded-xl p-4 border border-muted-foreground/10 bg-muted">
            <GrowthRateComponent />
          </div>
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl p-4 border border-muted-foreground/10 bg-muted">
            <CustomerChartComponent />
          </div>
          <ChartPieLabel />
          <ChartBarMultiple />
        </div>
      </div>
    </SidebarInset>
  )
}
