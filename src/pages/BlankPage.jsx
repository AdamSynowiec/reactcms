import { useDispatch, useSelector } from 'react-redux';
import { setLiveUpdates, clearCollectedUIDs } from '../features/editor/editorSlice';
import { useEffect } from 'react';
import EditableHeader from '../components/EditableHeader';
import EditorSidebar from '../components/EditorSidebar';
import EditableTag from '../components/EditableTag';

const API_URL = 'https://admin.reactcms.ct8.pl/content';

const BlankPage = () => {
  const dispatch = useDispatch();
  const collectedUIDs = useSelector((state) => state.editor.collectedUIDs);

  useEffect(() => {
    if (!collectedUIDs.length) return;

    const token = localStorage.getItem('token');
    fetch(`${API_URL}?uids=${collectedUIDs.join(',')}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(setLiveUpdates(data)))
      .finally(() => dispatch(clearCollectedUIDs()));
  }, [collectedUIDs, dispatch]);

  return (
    <>
      <EditableHeader />
      <EditorSidebar />

      {/* Main */}
      <div class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div class="absolute inset-0 -z-10 overflow-hidden">
          <svg aria-hidden="true" class="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200">
            <defs>
              <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
              <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />
            </svg>
            <rect width="100%" height="100%" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" stroke-width="0" />
          </svg>
        </div>
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div class="lg:pr-4">
              <div class="lg:max-w-lg">
                <EditableTag
                  uid="9449fa7c-3f5c-42c1-955a-2e1f6f1cc1f2"
                  tagName="p"
                  className="text-base/7 font-semibold text-sky-600"
                  editableFields={['text']}
                />
                <EditableTag
                  uid="99569b05-8eed-4e43-b3fc-0531bac990ba"
                  tagName="h1"
                  className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl"
                  editableFields={['text']}
                />
                <EditableTag
                  uid="0afdd595-25d2-4fcd-b555-332be9024211"
                  tagName="p"
                  className="mt-6 text-xl/8 text-gray-700"
                  editableFields={['text']}
                />
              </div>
            </div>
          </div>
          <div class="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <EditableTag
              uid="0afdd595-25d2-4fcd-b555-332be9024211"
              tagName="img"
              className="w-3xl max-w-none rounded-xl  shadow-xl ring-1 ring-gray-400/10 sm:w-228"
              editableFields={['src', 'alt']}
              isVoid={true}
            />
          </div>
          <div class="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div class="lg:pr-4">
              <div class="max-w-xl text-base/7 text-gray-600 lg:max-w-lg">
                <EditableTag
                  uid="6f3edc74-5bbb-4a75-a497-c7183b684c1b"
                  tagName="p"
                  className=""
                  editableFields={['text']}
                />
                <ul role="list" class="mt-8 space-y-8 text-gray-600">

                  <li class="flex gap-x-3">
                    <svg class="mt-1 size-5 flex-none text-sky-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clip-rule="evenodd" />
                    </svg>
                    <EditableTag
                      uid="e4ea07dd-de61-4cc2-a8df-14dd2df4c128"
                      tagName="span"
                      className=""
                      editableFields={['text']}
                    />                       </li>
                  <li class="flex gap-x-3">
                    <svg class="mt-1 size-5 flex-none text-sky-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clip-rule="evenodd" />
                    </svg>
                    <EditableTag
                      uid="954217eb-c2d8-4699-8c90-ab0514ede08a"
                      tagName="span"
                      className=""
                      editableFields={['text']}
                    />                       </li>
                  <li class="flex gap-x-3">
                    <svg class="mt-1 size-5 flex-none text-sky-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clip-rule="evenodd" />
                    </svg>
                    <EditableTag
                      uid="53d3ff19-9207-4ab2-ba05-a4dc077ecf5b"
                      tagName="span"
                      className=""
                      editableFields={['text']}
                    />                      </li>
                </ul>
                <EditableTag
                  uid="de875144-d01a-4a90-a909-11411c0abfb3"
                  tagName="p"
                  className="mt-8"
                  editableFields={['text']}
                />
                <EditableTag
                  uid="06ad9d61-4851-4479-8942-72e40a55992c"
                  tagName="h2"
                  className="mt-16 text-2xl font-bold tracking-tight text-gray-900"
                  editableFields={['text']}
                />
                <EditableTag
                  uid="35d81606-abcf-4ea0-9b31-25155eb7591d"
                  tagName="p"
                  className="mt-6"
                  editableFields={['text']}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="border-t border-slate-200 ">
        <div className="w-full max-w-7xl h-[50px] flex items-center justify-between text-center mx-auto px-6">
          <span className='text-slate-400 text-xs'>React CMS</span>
          <span className='text-slate-400 text-xs'>Powered by Adam Synowiec</span>
        </div>
      </div>

    </>
  );
};

export default BlankPage;
