import { useSearchMember } from "@/mutations/useMutationBusinessMember";
import Loader from "@/pages/Loader";
import type { FoundMember } from "@/types/Member.types";
import { Search } from "lucide-react";
import { useState } from "react";

type SearchMemberFormProps = {
  onMemberFound: (member: FoundMember) => void;
};

export default function SearchMemberForm({
  onMemberFound,
}: SearchMemberFormProps) {
  const [searchValue, setSearchValue] = useState("");

  const { mutate, isPending } = useSearchMember();

  const handleSearch = () => {
    if (!searchValue.trim()) return;

    mutate(searchValue, {
      onSuccess: (member) => {
        onMemberFound(member);
      },
    });
  };

  if (isPending) return <Loader />;

  return (
    <div className="relative">
      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200/90 rounded-xl font-medium placeholder:text-slate-400 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
      />
    </div>
  );
}
