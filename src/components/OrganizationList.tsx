import type { OrganizationType } from "../types/types";
import { useState } from "preact/hooks";

const OrgList = ({ orgs }: { orgs: OrganizationType[] }) => {
  const [search, setSearch] = useState("");
  const [filteredOrg, setFilteredOrg] = useState(orgs);

  const OrgFilter = (e: string) => {
    setFilteredOrg(
      orgs.filter(({ name }) => {
        return name.toLowerCase().includes(e);
      })
    );
  };

  const SortCategory = (e: string) => {
    setFilteredOrg(
      orgs.filter(({ field }) => {
        return field === e;
      })
    );
  };

  return (
    <>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        value={search}
        onChange={(e) =>
          setSearch((e.target as HTMLInputElement).value.toLowerCase())
        }
      ></input>
      <button
        className="w-8 h-8 bg-blue-400"
        onClick={() => OrgFilter(search)}
      />
      <Dropdown orgs={orgs} onClick={SortCategory} />
      {filteredOrg.map((org: OrganizationType) => (
        <OrgListItem org={org} />
      ))}
    </>
  );
};

const Dropdown = ({
  orgs,
  onClick,
}: {
  orgs: OrganizationType[];
  onClick: (e: string) => void;
}) => {
  const [dropdown, setDropDown] = useState("");
  const fieldList = [...new Set(orgs.map((org) => org.field))];

  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1">
        Dropdown
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {fieldList?.map((field) => (
          <li onClick={() => onClick(field!)}>
            <a>{field}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const OrgListItem = ({ org }: { org: OrganizationType }) => {
  return (
    <div class="px-2 mb-8">
      <div class="md:max-w-7xl max-w-[350px] shadow hover:shadow-md mx-auto p-5 py-6 rounded hover:-translate-y-3 transition-all border lg:border-none md:block flex flex-col items-center">
        <h3 class="lg:text-2xl font-bold text-lg">{org.name}</h3>
        <div class="mb-4 mt-2 md:block flex flex-col items-center">
          {org.field ? (
            <a href="">
              <div class="badge badge-primary badge-outline">{org.field}</div>
            </a>
          ) : (
            ""
          )}
          {org.goal ? (
            <a href="">
              <div class="badge badge-accent badge-outline">{org.goal}</div>
            </a>
          ) : (
            ""
          )}

          {org.base ? (
            <a href="">
              <div class="badge badge-secondary badge-outline">{org.base}</div>
            </a>
          ) : (
            ""
          )}
        </div>
        <p class="text-slate-600 mb-5 lg:text-base text-sm">
          {org.description}
        </p>
        <div>
          <a
            href={org.url}
            target="_blank"
            class="py-2 px-3 rounded capitalize text-white bg-blue-400 hover:bg-blue-500 cursor-pointer"
          >
            More info
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrgList;
