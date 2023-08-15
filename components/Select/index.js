import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

const Select = ({ data, selected, setSelected }) => {
  return (
    <div className="">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full text-sm font-medium text-icon-js">
            <span className="block truncate">{selected.name}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full border shadow overflow-auto rounded-md bg-main-800 text-text-500 font-semibold text-xs">
              {data.map((item, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none px-2 py-2 ${
                      active ? "bg-slate-500 text-white" : ""
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium text-icon-js" : "font-normal"
                        }`}
                      >
                        {item.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
