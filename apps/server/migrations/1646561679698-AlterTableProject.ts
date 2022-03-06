import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProject1646561679698 implements MigrationInterface {
  name = 'AlterTableProject1646561679698';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`cover_photo\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`cover_photo\` int NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`cover_photo\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`cover_photo\` varchar(255) NOT NULL
        `);
  }
}
