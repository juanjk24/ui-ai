import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AsideTabsList() {
  return (
    <TabsList className="flex flex-col flex-none h-fit max-h-min bg-transparent space-y-2 items-start w-full md:w-56 p-0 rounded-none shrink-0 justify-start">
      <TabsTrigger
        value="profile"
        className="w-full flex-none h-9 justify-start data-[state=active]:bg-muted hover:bg-muted/50 data-[state=active]:shadow-none rounded-md px-4 py-0 font-normal outline-none cursor-pointer"
      >
        Perfil
      </TabsTrigger>

      <TabsTrigger
        value="appearance"
        className="w-full flex-none h-9 justify-start data-[state=active]:bg-muted hover:bg-muted/50 data-[state=active]:shadow-none rounded-md px-4 py-0 font-normal outline-none cursor-pointer"
      >
        Apariencia
      </TabsTrigger>
    </TabsList>
  );
}
