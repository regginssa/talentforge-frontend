import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  Input,
  SearchCombobox,
  Textarea,
} from "@/components/atoms";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Experience } from "@/types/user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { countries } from "country-data-list";
import { DateDropdown } from "@/components/molecules";

export default function Employment() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [formData, setFormData] = useState<Experience>({
    title: "",
    company: "",
    location: {
      city: "",
      country: "",
    },
    isCurrent: false,
    startedAt: new Date(),
    endAt: new Date(),
    description: "",
  });
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <CreateProfileLayout
      title="If you have relevant work experience, add it here."
      description="Freelancers who add their experience are twice as likely to win work. But if you’re just starting out, you can still create a great profile. Just head on to the next page."
      currentStep={5}
      totalSteps={10}
      seo={{
        title: "If you have relevant work experience, add it here.",
        description:
          "Freelancers who add their experience are twice as likely to win work. But if you’re just starting out, you can still create a great profile. Just head on to the next page.",
        url: "/nx/create-profile/employment",
      }}
    >
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {experiences.map((experience, index) => (
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="border-2 border-dashed border-slate-400">
                  <CardContent className="flex flex-col gap-4 aspect-square items-start justify-center p-6">
                    <span className="flex items-center justify-center ronded-md bg-green-600 rounded-full">
                      <Icon icon="mdi:plus" className="text-white w-6 h-6" />
                    </span>
                    <p className="text-xl font-medium text-slate-800">
                      Add experience
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
          <CarouselItem className="basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card
                className="border-2 border-dashed border-slate-400 cursor-pointer bg-slate-50"
                onClick={() => setOpen(true)}
              >
                <CardContent className="flex flex-col gap-4 aspect-square items-start justify-center p-6">
                  <span className="flex items-center justify-center ronded-md bg-green-600 rounded-full">
                    <Icon icon="mdi:plus" className="text-white w-6 h-6" />
                  </span>
                  <p className="text-xl font-medium text-slate-800">
                    Add experience
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="mt-10 flex items-center justify-between font-medium">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full text-sm border border-slate-400"
          onClick={() => router.back()}
        >
          Back
        </motion.button>

        <Button
          type="primary"
          label="Next, add your education"
          classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
          onClick={() => router.push("/nx/create-profile/title")}
        />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex min-w-3xl flex-col">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">Add Work Experience</DialogTitle>
          </DialogHeader>

          <form className="space-y-6 p-4 no-scrollbar max-h-[60vh] overflow-y-auto">
            <Input
              type="text"
              name="title"
              label="Title"
              placeholder="Ex: Software Engineer"
              labelClassName="text-sm font-medium"
              required
              value={formData.title}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="company"
              label="Company"
              placeholder="Ex: Microsoft"
              labelClassName="text-sm font-medium"
              required
              value={formData.company}
              onChange={handleInputChange}
            />

            <div className="">
              <label className="text-sm font-medium">Location</label>
              <div className="flex items-center gap-6 mt-1">
                <div className="flex-1">
                  <Input
                    type="text"
                    name="location.city"
                    placeholder="Ex: New York"
                    labelClassName="text-sm font-medium"
                    required
                    value={formData.location.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-1">
                  <SearchCombobox
                    name="country"
                    placeholder="Country"
                    options={countries.all.map((c) => c.name)}
                    defaultOption={formData.location.country}
                    onSelect={(v: string) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, country: v },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.isCurrent}
                onCheck={(v: boolean) =>
                  setFormData({ ...formData, isCurrent: v })
                }
                className="w-5! h-5!"
              />
              <label className="text-sm">
                I am currently working in this role
              </label>
            </div>

            <div className="flex items-center gap-6">
              <DateDropdown
                label="Start Date"
                name="startedAt"
                required
                value={formData.startedAt}
                onChange={(v: Date) =>
                  setFormData({ ...formData, startedAt: v })
                }
                classname="flex-1"
              />
              <DateDropdown
                label="End Date"
                name="endAt"
                required
                value={formData.endAt}
                onChange={(v: Date) => setFormData({ ...formData, endAt: v })}
                classname="flex-1"
              />
            </div>

            <Textarea
              name="description"
              label="Description"
              labelClassName="text-sm font-medium"
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </form>

          <DialogFooter>
            <DialogClose asChild>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="py-2 px-4 rounded-full text-sm text-slate-600 font-medium cursor-pointer"
              >
                Cancel
              </motion.button>
            </DialogClose>
            <Button
              type="primary"
              label="Save"
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CreateProfileLayout>
  );
}
