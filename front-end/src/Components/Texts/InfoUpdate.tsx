type InfoUpdateProps = {
    title: string;
    description: string;
};

export default function InfoUpdate({ title, description }: InfoUpdateProps) {
  return (
    <section>
      <h3 className="text-lg text-gray-800 capitalize font-bold">
        {title}
    </h3>
      <p className="text-sm text-gray-400">
        {description}
      </p>
    </section>
  );
}
