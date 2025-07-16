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
      <EditableTag
        tagName="h2"
        className="text-3xl font-semibold tracking-tight text-balance text sm:text-4xl"
        uid="123-432-432"
        editableFields={['text']}
      />
      <EditableTag
        tagName="h1"
        className="text-7xl font-semibold tracking-tight text-balance text sm:text-4xl"
        uid="123-432-654"
        editableFields={['text']}
      />
      <EditableTag
        tagName="img"
        className="max-w-lg"
        uid="123-432-676"
        editableFields={['alt', 'src']}
        isVoid={true}
      />
      <EditorSidebar />
    </>
  );
};

export default BlankPage;
